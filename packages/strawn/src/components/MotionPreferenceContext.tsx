import { createContext } from "react";
import { MotionPreference } from "../types/MotionPreference";

export const MotionPreferenceContext = createContext<MotionPreference>("system");
