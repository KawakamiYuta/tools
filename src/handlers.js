import { greet, sample } from "./tauriApi";

export async function handleGreet(name, setGreetMsg) {
  setGreetMsg(await greet(name));
}

export async function handleSample() {
  alert(await sample());
}
