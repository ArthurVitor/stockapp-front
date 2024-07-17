export default interface IFilterSelectorProps {
	orderOptions: string[];
	onOptionChange?: (option: string) => void
	onDirectionChange?: (option: boolean) => void
}