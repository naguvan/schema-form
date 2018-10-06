import Form from "./Form";

import {
  IBooleanConfig,
  INumberConfig,
  IString,
  IStringConfig
} from "reactive-json-schema";

import { Boolean, Number, String } from "reactive-json-schema";

const name: IStringConfig = {
  minLength: 5,
  title: "Name",
  type: "string",
  value: "sk"
};

const age: INumberConfig = {
  maximum: 10,
  minimum: 0,
  title: "Age",
  type: "number",
  value: 1
};

const boy: IBooleanConfig = {
  title: "Boy?",
  type: "boolean",
  value: true
};

test("create form", () => {
  const form = Form.create({
    layout: ["name", "age", ["boy"]],
    schema: {
      properties: {
        age,
        boy,
        name
      },
      type: "object"
    },
    sections: [{ title: "Basic", layout: ["name", "age"] }],
    title: "Test Form"
  });

  // console.info(getSnapshot(form));

  expect(form.title).toBe("Test Form");
  expect(form.errors.length).toBe(0);
  expect(form.valid).toBe(true);
  expect(form.modified).toBe(false);
  expect(form.validating).toBe(false);

  expect(form.get("name")!.value).toBe("sk");
  expect(form.get("name")!.name).toBe("name");
  expect(String.is(form.get("name"))).toBe(true);

  expect(form.get("age")!.value).toBe(1);
  expect(form.get("age")!.name).toBe("age");
  expect(Number.is(form.get("age"))).toBe(true);

  expect(form.get("boy")!.value).toBe(true);
  expect(form.get("boy")!.name).toBe("boy");
  expect(Boolean.is(form.get("boy"))).toBe(true);

  expect(form.fields.length).toBe(3);
  expect(form.values).toEqual({ name: "sk", age: 1, boy: true });

  expect(form.layout).toEqual(["name", "age", ["boy"]]);

  expect(form.layout).toContain("age");

  expect(form.sections.length).toBe(1);
  expect(form.sections[0].title).toBe("Basic");
  expect(form.sections[0].layout).toEqual(["name", "age"]);
});

test("test form layout single mis-configuration error", () => {
  expect(() =>
    Form.create({
      layout: ["name", "age"],
      schema: {
        properties: {
          name
        },
        type: "object"
      },
      title: "Test Form"
    })
  ).toThrowError(`['age'] layout field is not configured.`);
});

test("test form layout multi mis-configuration error", () => {
  expect(() =>
    Form.create({
      layout: ["name", "age", ["boy"]],
      schema: {
        properties: {
          a: age,
          b: boy,
          name
        },
        type: "object"
      },
      title: "Test Form"
    })
  ).toThrowError(`['age', 'boy'] layout fields are not configured.`);
});

test("test field modification", () => {
  const form = Form.create({
    layout: ["name"],
    schema: {
      properties: {
        name
      },
      type: "object"
    },
    title: "Test Form"
  });

  expect(form.title).toBe("Test Form");
  expect(form.modified).toBe(false);
  expect(form.values).toEqual({ name: "sk" });

  const fname = form.get("name") as IString;
  fname!.setValue("senthilnathan");

  expect(form.modified).toBe(true);
  expect(form.values).toEqual({ name: "senthilnathan" });

  fname!.reset();
  expect(form.modified).toBe(false);
  expect(form.values).toEqual({ name: "sk" });
});

test("test field error", () => {
  const form = Form.create({
    layout: ["name"],
    schema: {
      properties: {
        name
      },
      type: "object"
    },
    title: "Test Form"
  });

  expect(form.title).toBe("Test Form");
  expect(form.valid).toBe(true);
  expect(form.fieldErrors).toEqual({ name: [] });

  const fname = form.get("name") as IString;
  fname!.addError("testing field error");

  expect(form.valid).toBe(false);
  expect(form.fieldErrors).toEqual({ name: ["testing field error"] });

  fname!.reset();
  expect(form.valid).toBe(true);
  expect(form.fieldErrors).toEqual({ name: [] });
});

test("test field validating", async () => {
  const form = Form.create({
    layout: ["name"],
    schema: {
      properties: {
        name
      },
      type: "object"
    },
    title: "Test Form"
  });

  expect(form.title).toBe("Test Form");
  expect(form.validating).toBe(false);

  const fname = form.get("name") as IString;

  const validate = fname.validate();
  expect(form.validating).toBe(true);

  await validate;
  expect(form.validating).toBe(false);
});
