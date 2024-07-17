import { useEffect } from "react";
import { IHeaderKeys } from "../lib/interfaces/header/IHeaderKeys";
import { IHeaders } from "../lib/interfaces/header/IHeaders";

type HeaderKeys = keyof IHeaders | undefined;

interface IUseHeaderDataProps {
    pagina: HeaderKeys,
    setHeaderData: (page: IHeaderKeys[]) => void
}

export function useHeaderData({ pagina, setHeaderData }: IUseHeaderDataProps) {
    useEffect(() => {
        const headers = {
          product: [
            { name: "Products", url: "/products/", tag: "listProducts" },
            { name: "Import", url: "/product/import", tag: "importProducts" },
            { name: "Register", url: "/product/create", tag: "createProduct" },
          ],
          parameters: [
            { name: "Parameters", url: "/parameters/", tag: "listParameters" },
            { name: "Register", url: "/parameter/create", tag: "createParameter" },
          ],
          subCategories: [

            { name: "Subcategories", url: "/subcategories/", tag: "listSubCategories" },
            { name: "Register", url: "/subcategory/create", tag: "createSubCategory" },
            { name: "Import", url: "/sub-categories/import", tag: "importSubCategories" },
          ],
          batches: [
            { name: "Batches", url: "/batches/", tag: "batches" },
          ],
          inventories: [
            { name: "Inventories", url: "/inventories/", tag: "listInventories" },
            { name: "Register", url: "/inventory/create", tag: "createInventory" },
          ],
          entryNotes: [
            { name: "Entry Notes", url: "/entry-notes/", tag: "listEntryNotes" },
            { name: "Register", url: "/entry-note/create", tag: "createEntryNote" },
          ],
          exitNotes: [
            { name: "Exit Notes", url: "/exit-notes/", tag: "listExitNotes" },
            { name: "Register", url: "/exit-note/create", tag: "createExitNote" },
          ],
          transactions: [
            { name: "Transactions", url: "/transactions/", tag: "listTransactions" },
          ],
          overrides: [
            { name: "Overrides", url: "/overrides/", tag: "listOverrides" },
          ], 
          adminRoute: [
            { name: "Expired Batches", url: "/admin/expired-batches", tag: 'listExpiredBatches'},
            { name: "Reverse Override Transactions", url: "/admin/reverse-transaction", tag: "reverseTransaction"}, 
            { name: "Reallocate Batch", url: "/admin/reallocate-batch", tag: "reallocateBatch"}
          ]
        };
      
        if (pagina) {
          setHeaderData(headers[pagina]);
        }
      }, [pagina]);
}