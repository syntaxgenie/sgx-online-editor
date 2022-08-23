import uploadIcon from '../../../../../../../resources/images/upload.svg'
import linkIcon from '../../../../../../../resources/images/link.svg'
import {BsThreeDotsVertical} from 'react-icons/bs'

const EditorActionContainer = () => {
  return <div className="eac-actions">
      <img className="eac-a-item" src={uploadIcon} alt=""/>
      <img className="eac-a-item" src={linkIcon} alt=""/>
      <BsThreeDotsVertical className="eac-a-item"/>
  </div>;
};

export default EditorActionContainer;
