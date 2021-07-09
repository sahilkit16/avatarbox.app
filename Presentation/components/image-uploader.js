import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { getFileExtension } from "avatarbox.sdk/Release/Common/helpers";

function ImageUploader() {
  const { user } = useSelector((state) => state);

  const handleUpload = async (e) => {
    const input = document.getElementById("imageUploader");
    const mimeType = getFileExtension(input.files[0].name);
    const fileName = `${v4()}.${mimeType}`;

    const form = new FormData();

    fetch("/api/presign-post?fileName=" + fileName)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(({ url, fields }) => {
        for (let key in fields) {
          form.append(key, fields[key]);
        }
        form.append("file", input.files[0], fileName);
        return url;
      })
      .then((url) => {
        fetch(url, {
          method: "post",
          body: form,
        })
          .then((res) => {
            if (res.ok) {
              const imageUrl = `https://icons.avatarbox.io/u/${user.id}/${fileName}`;
              document
                .getElementById("imageUrl")
                .setAttribute("value", imageUrl);
              document.getElementById("menu-form").submit();
            }
          })
          .catch(console.log);
      })
      .catch(console.log);
  };

  return (
    <input
      id="imageUploader"
      type="file"
      accept="image/png, image/jpeg"
      onChange={handleUpload}
    />
  );
}

export default ImageUploader;
