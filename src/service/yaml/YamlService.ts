import * as YAML from "js-yaml";

export function yamlToJson(yaml: string) {
  const configOrigin = YAML.load(yaml);
  const json: string = configOrigin as string;
  return json;
}

export function jsonToProperties(jsonObj: object, parentKey: string): string {
  let propsArr: string[] = [];
  for (let key in jsonObj) {
    let val: any = jsonObj[key as keyof typeof jsonObj];
    if (typeof val === "object") {
      let nestedValue = jsonToProperties(val, key);
      propsArr.push(nestedValue);
    } else {
      if (parentKey && parentKey.length > 0) {
        const concatKey = parentKey + "." + key;
        propsArr.push(`${concatKey}=${val}`);
      } else {
        propsArr.push(`${key}=${val}`);
      }
    }
  }
  return propsArr.join("\n");
}
