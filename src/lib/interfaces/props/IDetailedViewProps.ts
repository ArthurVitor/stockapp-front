export interface DetailedViewProps {
	title: string;
	entity: Record<string, any>;
	dependencies: Record<string, any>[][];
	dependenciesTitles: string[];
	keysBlackList: string[];
}