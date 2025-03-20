import { Cloudinary } from "@cloudinary/url-gen/index"
// TODO go through this when my brain is functioning

export default function ImageUploader() {

    // const widget = new Cloudinary.createU

    return (
        <div id="image-uploader">
            {/* <button id="upload_widget" className="cloudinary-button">Upload files</button>

            <script src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript"></script>

            <script type="text/javascript">
                var myWidget = cloudinary.createUploadWidget({
                    cloudName: 'my_cloud_name',
        uploadPreset: 'my_preset'}, (error, result) => {
            if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);

        }
                )

                document.getElementById("upload_widget").addEventListener("click", function(){
                    myWidget.open();
        }, false);}
            </script> */}

        </div>)
}
