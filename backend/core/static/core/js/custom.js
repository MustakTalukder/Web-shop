document.addEventListener('DOMContentLoaded', function () {
    const categoryField = document.getElementById('id_category');
    const subcategoryField = document.getElementById('id_subcategory');

    function updateSubcategories() {
        const selectedCategory = categoryField.value;
        if (!selectedCategory) {
            subcategoryField.innerHTML = '<option value="">---------</option>';
            return;
        }
        fetch(`/admin/core/subcategory_by_category/${selectedCategory}/`)
            .then(response => response.json())
            .then(data => {
                // Clear existing options
                subcategoryField.innerHTML = '';
                // Populate new options
                subcategoryField.innerHTML = '<option value="">---------</option>';
                data.subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.textContent = subcategory.name;
                    subcategoryField.appendChild(option);
                });
            });
    }

    if (categoryField) {
        categoryField.addEventListener('change', updateSubcategories);
        // Initial call to set subcategories
        if (categoryField.value) {
            updateSubcategories();
        }
    }
});
