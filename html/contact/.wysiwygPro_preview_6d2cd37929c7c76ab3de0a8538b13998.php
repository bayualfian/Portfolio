<?php
if ($_GET['randomId'] != "2kyAz7wGgWNTiFe2HqbwGyZ9DVdEGhz99Oxj7hCDDHWHXdLeBYVoIVp0eRMj3axS") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
