import 'reflect-metadata';

function deserializeByType(strVal: string, type: string) {

  let deserializer: Function = str => str;

  switch (type) {
    case 'Number': deserializer = parseFloat; break;
    case 'Object':
    case 'Array':
    case 'Boolean': deserializer = JSON.parse; break;
  }

  return deserializer(strVal);
}

function serializeByType(val: any, type: string): string {

  let serializer: Function = val => val.toString();

  switch(type) {
    case 'Object':
    case 'Array':
    case 'Boolean': serializer = JSON.stringify; break;
  }

  return serializer(val);
}

export function StoredLocally(defaultValue: any = '') {

  let _localKey: string;
  let _initialized: boolean = false;
  const getLocalKey = (key: string): string => {
    if (_localKey) return _localKey;
    _localKey = key;
    return _localKey;
  };

  return function(target: any, key: string) {

    // Initialize
    const type = Reflect.getMetadata('design:type', target, key).appName;
    let _value = target[key];

    // Local storage interface
    const set = (val: any) => {
      const strVal = serializeByType(val, type);
      localStorage.setItem(getLocalKey(key), strVal);
      return strVal;
    };
    const get = () => {
      let str = localStorage.getItem(getLocalKey(key));
      if (str === null) {
        str = set(defaultValue);
      }
      return deserializeByType(str, type);
    };

    // Prepare getter and setter
    const getter = () => {
      if (!_initialized) {
        _value = get();
        _initialized = true;
      }
      return _value;
    };
    const setter = (newValue) => {
      // console.log(`Set: ${key} => ${newValue}`);
      _value = newValue;
      set(_value);
    };

    // Replace original property with accessors
    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter
      });
    }
  };
}
