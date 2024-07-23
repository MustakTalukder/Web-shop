document.addEventListener('DOMContentLoaded', function () {
    console.log('custom.js loaded');
    const categoryField = document.getElementById('id_category');
    const subcategoryField = document.getElementById('id_subcategory');

    function updateSubcategories() {
        console.log('Category changed:', categoryField.value);
        const selectedCategory = categoryField.value;
        if (!selectedCategory) {
            subcategoryField.innerHTML = '<option value="">---------</option>';
            return;
        }
        const url = `/admin/core/product/subcategory_by_category/${selectedCategory}/`;
        console.log('Fetching subcategories from URL:', url);

        fetch(url)
            .then(response => {
                console.log('Response received:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Subcategories fetched:', data);
                subcategoryField.innerHTML = '<option value="">---------</option>';
                data.subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.textContent = subcategory.name;
                    subcategoryField.appendChild(option);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    if (categoryField) {
        categoryField.addEventListener('change', updateSubcategories);
        if (categoryField.value) {
            updateSubcategories();
        }
    }
});
