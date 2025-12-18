import { createContext } from "react";

export interface InstallContextValue {
    installPrompt?:Event;
}

const InstallContext = createContext<InstallContextValue>({});
export default InstallContext;