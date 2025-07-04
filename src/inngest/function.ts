import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer. You write readable and maintainable code. You write simple Next.js & React snippets. You like to use tailwindcss.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await step.run("code-agent", async () => {
      return await codeAgent.run(
        `Write the following snippet: ${event.data.value}`,
      );
    });

    return { output };
  },
);
