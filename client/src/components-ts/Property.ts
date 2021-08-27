const GameProperty = (key: string, value: string) => {
  const div = document.createElement("div");
  const divKey = document.createElement("span");
  const divValue = document.createElement("span");

  div.classList.add("property");
  divKey.classList.add("key");
  divKey.innerText = key;
  divValue.classList.add("value");
  divValue.innerText = value;

  div.append(divKey);
  div.append(divValue);
  div.addEventListener("update", (event: CustomEvent<string>) => {
    const { detail } = event;
    divValue.innerText = detail;
  });

  return div;
};

export default GameProperty;
