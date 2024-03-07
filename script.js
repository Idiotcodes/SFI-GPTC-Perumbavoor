		
        function toggleDropdown(id) {
            const dropdown = document.getElementById(id);
            if (dropdown.style.display === "none" || dropdown.style.display === "") {
                dropdown.style.display = "block";
            } else {
                dropdown.style.display = "none";
            }
        }

		// Function to show/hide subject popup when a semester button is clicked
		function toggleSubjectsPopup(id) {
    		const popup = document.getElementById(id);
    		const popups = document.querySelectorAll('.dropdown-list2');
    
    	// Close all other subject popups except the one being clicked
    		popups.forEach((popupElement) => {
        	if (popupElement.id !== id) {
            popupElement.style.display = 'none';
        }
    	});

    // Toggle the display of the subject popup for the clicked semester
    		if (popup.style.display === 'none' || popup.style.display === '') {
        		popup.style.display = 'block';
    		} else {
        		popup.style.display = 'none';
    		}
		}

		function closeSubjectsPopup(id) {
    		const popup = document.getElementById(id);
    			popup.style.display = 'none';
		}

        function toggleBox() {
    var box = document.getElementById('box');
    box.style.display = (box.style.display === 'none' || box.style.display === '') ? 'block' : 'none';
    }

     // Add this JavaScript to show the modal when the page loads
window.onload = function() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
