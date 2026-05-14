import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

const starterMarkdown = `# Why polished frontend architecture matters

Developer products earn trust through clarity, consistency, and performance.

\`\`\`js
const ship = (experience) => experience === "premium";
\`\`\`
`;

const WriteBlogPage = () => {
  const { register } = useForm({
    defaultValues: {
      title: "Why polished frontend architecture matters",
      tags: "React, Architecture, SaaS",
    },
  });
  const [value, setValue] = useState(starterMarkdown);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Markdown editor</p>
        <h1 className="mt-3 text-3xl font-semibold">Write, preview, and publish technical ideas</h1>
      </div>
      <Card className="space-y-4">
        <Input placeholder="Blog title" {...register("title")} />
        <Input placeholder="Tags" {...register("tags")} />
      </Card>
      <Card>
        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <div data-color-mode="dark">
              <MDEditor value={value} onChange={setValue} height={420} />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="rounded-[28px] border border-white/8 bg-white/5 p-5" data-color-mode="dark">
              <MDEditor.Markdown source={value} />
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-5 flex gap-3">
          <Button>Publish blog</Button>
          <Button variant="secondary">Save draft</Button>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlogPage;
