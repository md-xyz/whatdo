"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import { EyeIcon, CodeIcon, CrownIcon, MessageSquareIcon } from "lucide-react";

import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { FileExplorer } from "@/components/file-explorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { FragmentWeb } from "../components/fragment-web";
import { ProjectHeader } from "../components/project-header";
import { MessagesContainer } from "../components/messages-container";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  projectId: string;
};

export const ProjectView = ({ projectId }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");
  const [mobileTab, setMobileTab] = useState<"chat" | "demo" | "code">("chat");

  return (
    <div className="h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={35}
            minSize={20}
            className="flex flex-col min-h-0"
          >
            <ErrorBoundary fallback={<p>Project header error</p>}>
              <Suspense fallback={<p>Loading project...</p>}>
                <ProjectHeader projectId={projectId} />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<p>Messages container error</p>}>
              <Suspense fallback={<p>Loading messages...</p>}>
                <MessagesContainer
                  projectId={projectId}
                  activeFragment={activeFragment}
                  setActiveFragment={setActiveFragment}
                />
              </Suspense>
            </ErrorBoundary>
          </ResizablePanel>
          <ResizableHandle className="hover:bg-primary transition-colors" />
          <ResizablePanel
            defaultSize={65}
            minSize={50}
          >
            <Tabs
              className="h-full gap-y-0"
              defaultValue="preview"
              value={tabState}
              onValueChange={(value) => setTabState(value as "preview" | "code")}
            >
              <div className="w-full flex items-center p-2 border-b gap-x-2">
                <TabsList className="h-8 p-0 border rounded-md">
                  <TabsTrigger value="preview" className="rounded-md">
                    <EyeIcon /> <span>Demo</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="rounded-md">
                    <CodeIcon /> <span>Code</span>
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-x-2">
                  {!hasProAccess && (
                    <Button asChild size="sm" variant="tertiary">
                      <Link href="/pricing">
                        <CrownIcon /> Upgrade
                      </Link>
                    </Button>
                  )}
                  <UserControl />
                </div>
              </div>
              <TabsContent value="preview">
                {!!activeFragment && <FragmentWeb data={activeFragment} />}
              </TabsContent>
              <TabsContent value="code" className="min-h-0">
                {!!activeFragment?.files && (
                  <FileExplorer
                    files={activeFragment.files as { [path: string]: string }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-full flex flex-col">
        {/* Top Navigation */}
        <div className="w-full flex items-center p-2 border-b gap-x-2">
          <ErrorBoundary fallback={<p>Project header error</p>}>
            <Suspense fallback={<p>Loading project...</p>}>
              <ProjectHeader projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
          <div className="ml-auto flex items-center gap-x-2">
            {!hasProAccess && (
              <Button asChild size="sm" variant="tertiary">
                <Link href="/pricing">
                  <CrownIcon className="w-4 h-4" />
                </Link>
              </Button>
            )}
            <UserControl />
          </div>
        </div>

        <Tabs
          className="h-full"
          defaultValue="chat"
          value={mobileTab}
          onValueChange={(value) => setMobileTab(value as "chat" | "demo")}
        >
          <TabsContent value="chat" className="flex-1 min-h-0">
            <ErrorBoundary fallback={<p>Messages container error</p>}>
              <Suspense fallback={<p>Loading messages...</p>}>
                <MessagesContainer
                  projectId={projectId}
                  activeFragment={activeFragment}
                  setActiveFragment={setActiveFragment}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="demo" className="flex-1 min-h-0">
            <Tabs
              className="h-full gap-y-0"
              defaultValue="preview"
              value={tabState}
              onValueChange={(value) => setTabState(value as "preview" | "code")}
            >
              <div className="w-full flex items-center p-2 border-b gap-x-2">
                <TabsList className="h-8 p-0 border rounded-md">
                  <TabsTrigger value="preview" className="rounded-md">
                    <EyeIcon /> <span>Demo</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="rounded-md">
                    <CodeIcon /> <span>Code</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="preview">
                {!!activeFragment && <FragmentWeb data={activeFragment} />}
              </TabsContent>
              <TabsContent value="code" className="min-h-0">
                {!!activeFragment?.files && (
                  <FileExplorer
                    files={activeFragment.files as { [path: string]: string }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Bottom Tab Navigation */}
        <div className="border-t bg-background">
          <div className="flex">
            <button
              onClick={() => setMobileTab("chat")}
              className={`flex-1 flex flex-col items-center py-2 px-1 text-xs ${mobileTab === "chat"
                ? "text-primary border-t-2 border-primary"
                : "text-muted-foreground"
                }`}
            >
              <MessageSquareIcon className="w-5 h-5 mb-1" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setMobileTab("demo")}
              className={`flex-1 flex flex-col items-center py-2 px-1 text-xs ${mobileTab === "demo"
                ? "text-primary border-t-2 border-primary"
                : "text-muted-foreground"
                }`}
            >
              <EyeIcon className="w-5 h-5 mb-1" />
              <span>Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};