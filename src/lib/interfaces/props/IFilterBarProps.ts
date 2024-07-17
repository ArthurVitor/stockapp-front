export default interface FilterBarProps {
	orderOptions: string[];
	searchMessage?: string; 
	onOptionChange?: (option: string) => void
	onDirectionChange?: (option: boolean) => void
	onSearchChange?: (searchTerm: string) => void;
	onClick?: () => void
	buttonText? : string;
}