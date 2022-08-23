import { ITreeNode } from "@blueprintjs/core";
import { NodeData } from "../firebase/firestore/FileExploreHelper";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

// import { FileTypes } from "../screens/main-screen/components/dialogs/main-dialog/MainDialog";

const exportProject = (data: any, projectName: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
        type: "text/plain"
    }));
    a.setAttribute("download", `${projectName}-${new Date().toDateString()}-${new Date().toTimeString()}.wge`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


const importFolderAsProject = (fileList: FileList) => {
    let data: ITreeNode<NodeData>[] = []

    Array.from(fileList).forEach(f => {
        const x = f as any;
        const path = x.webkitRelativePath as string;
        const nameAndType = (x.name as string).split(".");
        const name = nameAndType[0];
        const type = nameAndType[1];
        const pathArray = path.split("/");
        pathArray.pop();
        let c_p = data;
        pathArray.forEach((p, index) => {
            const [node] = c_p.filter(n => n.label === p);
            if (!node) {
                const newFolder = index === 0 ? createNode(
                    c_p.length + "",
                    "PROJECT",
                    p,
                    "null",
                    path,
                ) : createNode(
                    c_p.length + "",
                    "FOLDER",
                    p,
                    "null",
                    path,
                )
                c_p.push(newFolder)
                if (newFolder.childNodes) {
                    c_p = newFolder.childNodes;
                } else {
                    console.log("error...!")
                }
            } else {
                if (node.childNodes) {
                    c_p = node.childNodes;
                } else {
                    console.log("error...!")
                }

            }
        })
        getFileContentAsString(f, (content) => {
            const newFile = createNode(
                c_p.length + "",
                "FILE",
                name,
                type,
                path,
                content.replace("\"","'")
            )
            c_p.push(newFile)
        })


    });

    return data;
}


const getFileContentAsString = (file: File, onRead: (content: string) => void) => {
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            onRead(evt?.target?.result as string);
        }
        reader.onerror = function (evt) {
            console.log("error reading file")
        }
    }
}

const createNode =
    (id: string,
        mainType: "FOLDER" | "FILE" | "PROJECT",
        name: string,
        type: string,
        path: string,
        content?: string
    )
        : ITreeNode<NodeData> => {
        return {
            id: id,
            icon: mainType === "FOLDER" ? "folder-close" : mainType === "FILE" ? "document" : "airplane",
            hasCaret: mainType !== "FILE",
            isExpanded: false,
            label: mainType !== "FILE" ? name : name + "." + type,
            childNodes: [],
            nodeData: {
                MainType: mainType,
                fileType: type,
                content: content || "",
                id: id,
                path: path,
                name: name,
            },
        }
    }



const getRandomName = () => {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '-',
        length: 2,
    })
}


export { exportProject, importFolderAsProject, getRandomName }