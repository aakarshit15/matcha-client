"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ApplicationsTable } from "./ApplicationsTable"

export default function ApplicationCollapsible(props: any) {
  return (
    <div className="w-full p-6 flex justify-center">
      <Collapsible className="w-1/2 space-y-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-2 font-medium [&[data-state=open]>svg]:rotate-180">
        <div className="flex justify-between items-center gap-10">
          <span className="text-3xl">
            {props.posting.title}
          </span>
          <span className="text-xl">
            {props.posting.location}
          </span>
        </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-200"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {/* <div className="rounded-md border px-4 py-3 text-sm">
            Yes. Free to use for personal and commercial projects. No attribution
            required.
          </div> */}
          <ApplicationsTable posting={props.posting} className="w-full border-4 rounded-md" />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}