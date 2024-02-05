onmessage = async (event: any) => {
  const { countdownSeconds } = event.data;

  const sleep = (milliseconds: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

  for (let i = countdownSeconds; i >= 0; i--) {
    postMessage(i);
    await sleep(1000);
  }
};

export {};
