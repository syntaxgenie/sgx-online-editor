const copyToClipboard = (text: string) => {
  const c_data = (window as any).clipboardData;
  if (c_data && c_data.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return c_data.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
};

export { copyToClipboard };
