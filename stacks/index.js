import Stack from "./stack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  new Stack(app, "my-stack");

  // Add more stacks
}
