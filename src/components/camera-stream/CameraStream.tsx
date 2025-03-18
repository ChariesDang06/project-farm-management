import { useState, useEffect } from "react";

const CameraStream = ({ camId }: { camId: string }) => {
    const [frameSrc, setFrameSrc] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const API_URL = "/api/detect";
    const WS_URL = `ws://localhost:8765/${camId}`;

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "video_frame") {
                setFrameSrc(`data:image/jpeg;base64,${data.frame}`);
                sendFrameToApi(data.frame);
            } else if (data.type === "welcome" || data.type === "error") {
                console.log(data.message);
            }
        };

        ws.onopen = () => console.log("Connected to WebSocket server");
        ws.onclose = () => console.log("Disconnected from WebSocket server");

        return () => ws.close();
    }, []);

    const sendFrameToApi = async (frame:any) => {
        const formData = new FormData();
        formData.append("file", dataURItoBlob(`data:image/jpeg;base64,${frame}`), "frame.jpg");

        try {
            const response = await fetch(API_URL, { method: "POST", body: formData });
            const result = await response.json();

            if (result.person_detected) {
                setAlertMessage("🚨 Person detected!");
            } else {
                setAlertMessage("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const dataURItoBlob = (dataURI:string) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>{alertMessage ? alertMessage : "Nobody here"}</div>
            <img src={frameSrc} alt="Camera Feed" style={{ maxWidth: "640px", border: "2px solid black" }} />
            
        </div>
    );
};

export default CameraStream;
