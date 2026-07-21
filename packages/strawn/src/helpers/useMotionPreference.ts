import { useContext } from "react";
import { MotionPreferenceContext } from "../components/MotionPreferenceContext";

export function useMotionPreference() {
    return useContext(MotionPreferenceContext);
}
