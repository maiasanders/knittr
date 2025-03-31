import { createContext, useEffect, useState } from "react";
import './imageUploader.css'

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<{ loaded: boolean }>({ loaded: false });

interface CloudinaryUploadWidgetProps {
    // uwConfig: any; // Adjust the type based on the actual type of uwConfig
    // setPublicId: React.ChangeEventHandler;
    handleUpload: (url: string) => void

}

function ImageUploader({ handleUpload }: CloudinaryUploadWidgetProps) {
    const [loaded, setLoaded] = useState(false);

    const uwConfig = {
        cloudName: 'dlwzfvixi',
        uploadPreset: 'knittr',
        sources: [
            "local",
            "url",
            "camera",
            "google_drive"
        ],
        showAdvancedOptions: false,
        cropping: false,
        defaultSource: "local",
        styles: {
            palette: {
                window: "#1C4970",
                sourceBg: "#1d5587",
                windowBorder: "#E9DBE6",
                tabIcon: "#D5F6E6",
                inactiveTabIcon: "#9B6789",
                menuIcons: "#E9DBE6",
                link: "#835371",
                action: "#336BFF",
                inProgress: "#20A97F",
                complete: "#5CCCA6",
                error: "#D75C5C",
                textDark: "#000000",
                textLight: "#FFFFFF"
            },
            fonts: {
                default: null,
                "sans-serif": {
                    url: null,
                    active: true
                }
            }
        }
    }

    useEffect(() => {
        // Check if the script is already loaded
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                // If not loaded, create and load the script
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                // If already loaded, update the state
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            const myWidget: any = window.cloudinary.createUploadWidget(
                uwConfig,
                (error: any, result: any) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info);
                        handleUpload(result.info.url);
                    }
                }
            );

            document.getElementById("upload_widget")?.addEventListener(
                "click",
                () => {
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <div id="upload-widget">
            <CloudinaryScriptContext.Provider value={{ loaded }}>
                <button
                    id="upload_widget"
                    className="cloudinary-button btn btn-primary"
                    onClick={initializeCloudinaryWidget}
                >
                    Upload Images
                </button>
            </CloudinaryScriptContext.Provider>
        </div>
    );
}

export default ImageUploader;
export { CloudinaryScriptContext };
