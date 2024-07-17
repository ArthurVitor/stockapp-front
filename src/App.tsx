import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { ProductsPage } from "./pages/Product/ListProducts/ProductsPage";
import { CreateProduct } from "./pages/Product/CreateProduct/CreateProductPage";
import { SubCategoriesPage } from "./pages/SubCategory/ListSubCategories/SubCategoriesPage";
import { BatchesPage } from "./pages/Batch/ListBatches/BatchesPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { CreateSubCategoryPage } from "./pages/SubCategory/CreateSubCategory/CreateSubCategoryPage";
import { InventoriesPage } from "./pages/Inventory/ListInventories/InventoriesPage";
import { EntryNotesPage } from "./pages/EntryNote/ListEntryNotes/EntryNotesPage";
import { CreateEntryNotePage } from "./pages/EntryNote/CreateEntryNote/CreateEntryNotePage";
import { CreateInventoryPage } from "./pages/Inventory/CreateInventory/CreateInventoryPage";
import { ExitNotesPage } from "./pages/ExitNote/ListExitNotes/ExitNotesPage";
import { CreateExitNotePage } from "./pages/ExitNote/CreateExitNote/CreateExitNotePage";
import { ParametersPage } from "./pages/Parameters/ListParameters/ParametersPage";
import { CreateParameterPage } from "./pages/Parameters/CreateParameters/CreateParameterPage";
import { TransactionsPage } from "./pages/Transactions/ListTransactions/TransactionsPage";
import DetailedProductView from "./pages/Product/DetailedProductView/DetailedProductView";
import OverridesPage from "./pages/Override/ListOverrides/OverridesPage";
import { DetailedExitNoteList } from "./pages/ExitNote/DetailedExitNoteList/DetailedExitNoteList";
import { DetailedInventoryList } from "./pages/Inventory/DetailedInventoryList/DetailedInventoryList";
import { ExpiredBatchesPage } from "./pages/Admin/ListExpiredBatches/ExpiredBatchesPage";
import { ReallocateBatchPage } from "./pages/Admin/ReallocateBatch/ReallocateBatchPage";
import { ReverseTransactionsPage } from "./pages/Admin/ReverseTransactions/ReverseTransactionsPage";
import { ProductImporting } from "./pages/Product/ProductImporting/ProductImporting";
import { SubCategoriesImporting } from "./pages/SubCategory/SubCategoriesImporting/SubCategoriesImporting";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} >
          {/* Products */}
          <Route path="products" element={<ProductsPage />}/>
          <Route path="product/create" element={<CreateProduct />}/>
          <Route path="product/import" element={<ProductImporting  />}/>
          <Route path="product/:productId" element={<DetailedProductView />}/>

          {/* SubCategories */}
          <Route path="subcategories" element={<SubCategoriesPage />}/>
          <Route path="subcategory/create" element={<CreateSubCategoryPage />}/>

          {/* Batches */}
          <Route path="batches" element={<BatchesPage />}/>

          {/* Invetories */}
          <Route path="inventories" element={<InventoriesPage />}/>
          <Route path="inventory/create" element={<CreateInventoryPage />}/>
          <Route path="inventory/:inventoryId" element={<DetailedInventoryList />}/>

          {/* Entry Notes */}
          <Route path="entry-notes" element={<EntryNotesPage />}/>
          <Route path="entry-note/create" element={<CreateEntryNotePage />}/>

          {/* Exit Notes */}
          <Route path="exit-notes" element={<ExitNotesPage />}/>
          <Route path="exit-note/create" element={<CreateExitNotePage />}/>
          <Route path="exit-note/:exitNoteId" element={<DetailedExitNoteList />}/>

          {/* Parameters */}
          <Route path="parameters" element={<ParametersPage/>}/>
          <Route path="parameter/create" element={<CreateParameterPage/>}/>

          {/* Transactions */}
          <Route path="transactions" element={<TransactionsPage/>}/>

          {/* Overrides */}
          <Route path="overrides" element={<OverridesPage/>}/>

          {/* Admin */}
          <Route path="admin/expired-batches" element={<ExpiredBatchesPage/>}/>
          <Route path="admin/reallocate-batch" element={<ReallocateBatchPage/>}/>
          <Route path="admin/reverse-transaction" element={<ReverseTransactionsPage/>}/>
          
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}
