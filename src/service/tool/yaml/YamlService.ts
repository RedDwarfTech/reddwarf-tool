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

interface Config {
  [key: string]: string | Config;
}

export function parseProperties(str: string): Config {
  const lines = str.split(/\r?\n/);
  const config: Config = {};
  for (const line of lines) {
    const matches = line.match(/^\s*([^:=\s]+)\s*[:=]\s*(.*)?\s*$/);
    if (matches != null) {
      const key = matches[1];
      let value = matches[2];
      if (value != null && value.endsWith("\\")) {
        value = value.slice(0, -1);
      }
      let current = config;
      const keyParts = key.split(".");
      for (let i = 0; i < keyParts.length - 1; i++) {
        const part = keyParts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part] as Config;
      }
      if (keyParts.length > 1) {
        current[keyParts[keyParts.length - 1]] = value;
      } else {
        current[key] = value;
      }
    }
  }
  return config;
}

export function stringifyYaml(obj: any): string {
  const lines = [];
  for (const key of Object.keys(obj).sort()) {
    const value = obj[key];
    if (typeof value === "string") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}:`);
      lines.push(stringifyYaml(value).split(/\r?\n/).map(line => "  " + line).join("\n"));
    }
  }
  return lines.join("\n");
}