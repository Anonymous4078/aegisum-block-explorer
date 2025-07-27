import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

function Pagination(props: React.ComponentProps<"nav">): JSX.Element {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			className={cn("mx-auto flex w-full justify-center", props.className)}
			{...props}
		/>
	);
}
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
	(props, ref): JSX.Element => (
		<ul
			ref={ref}
			className={cn("flex flex-row items-center gap-1", props.className)}
			{...props}
		/>
	),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
	(props, ref): JSX.Element => (
		<li
			ref={ref}
			className={cn("", props.className)}
			{...props}
		/>
	),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	readonly isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps): JSX.Element {
	return (
		<a
			aria-current={isActive === true ? "page" : undefined}
			className={cn(
				buttonVariants({
					size,
					variant: isActive === true ? "outline" : "ghost",
				}),
				className,
			)}
			{...props}
		/>
	);
}
PaginationLink.displayName = "PaginationLink";

function PaginationPrevious(
	props: React.ComponentProps<typeof PaginationLink>,
): JSX.Element {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("gap-1 pl-2.5", props.className)}
			{...props}
		>
			<ChevronLeft className="h-4 w-4" />
			<span>Previous</span>
		</PaginationLink>
	);
}
PaginationPrevious.displayName = "PaginationPrevious";

function PaginationNext(
	props: React.ComponentProps<typeof PaginationLink>,
): JSX.Element {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("gap-1 pr-2.5", props.className)}
			{...props}
		>
			<span>Next</span>
			<ChevronRight className="h-4 w-4" />
		</PaginationLink>
	);
}
PaginationNext.displayName = "PaginationNext";

function PaginationEllipsis(
	props: React.ComponentProps<"span">,
): JSX.Element {
	return (
		<span
			aria-hidden
			className={cn("flex h-9 w-9 items-center justify-center", props.className)}
			{...props}
		>
			<MoreHorizontal className="h-4 w-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
