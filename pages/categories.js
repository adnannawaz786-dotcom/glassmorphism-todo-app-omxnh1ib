              <FolderOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No categories found. Add a new category to get started.</p>
            </motion.div >
          )}

{/* Edit Category Dialog */ }
<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
  <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20 text-white">
    <DialogHeader>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogDescription className="text-white/70">
        Modify the category details below.
      </DialogDescription>
    </DialogHeader>
    {editingCategory && (
      <div className="space-y-4">
        <div>
          <Label htmlFor="edit-category-name">Category Name</Label>
          <Input
            id="edit-category-name"
            value={editingCategory.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
            placeholder="Enter category name..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label htmlFor="edit-category-description">Description (Optional)</Label>
          <Input
            id="edit-category-description"
            value={editingCategory.description}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, description: e.target.value })
            }
            placeholder="Enter category description..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label>Color</Label>
          <div className="flex gap-2 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setEditingCategory({ ...editingCategory, color })
                }
                className={`w-8 h-8 rounded-full border-2 transition-all ${editingCategory.color === color
                    ? 'border-white scale-110'
                    : 'border-white/30'
                  }`}
                style={{ backgroundColor: color }}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    )}
    <DialogFooter>
      <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleEditCategory} className="bg-white/20 hover:bg-white/30">
        Save Changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Delete Category AlertDialog */ }
<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
  <AlertDialogContent className="bg-black/40 backdrop-blur-xl border border-white/20 text-white">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Category</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to delete the category{' '}
        <strong>{deletingCategory?.name}</strong>? This will move all todos
        in this category to the "Personal" category.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleDeleteCategory}
        className="bg-red-600 hover:bg-red-700"
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div >
      </div >
    </>
  )
}

export default Categories;
