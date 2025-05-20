self.onmessage = async (event) => {
  const file = event.data;
  const reader = new FileReader();

  reader.onload = () => {
    const text = reader.result;
    self.postMessage({ text });
  };

  reader.readAsText(file);
};
