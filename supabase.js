const SUPABASE_URL = "sb_secret__K3G-zfTkIJyAkz8bGv18w_z6dHgh1j";
const SUPABASE_KEY = "sb_publishable_YAxqdWra-SoUDlXluoXivg_EZ0fRtip";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const SUPABASE_URL = "sb_secret__K3G-zfTkIJyAkz8bGv18w_z6dHgh1j";
const SUPABASE_KEY = "sb_publishable_YAxqdWra-SoUDlXluoXivg_EZ0fRtip";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadStatus() {
    const { data, error } = await supabaseClient
        .from("settings")
        .select("status")
        .eq("id", 1)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("barber-status").textContent = data.status;
}

loadStatus();   
async function updateStatus(isOpen) {
    const button = document.getElementById("statusButton");

    button.textContent = "Updating...";
    button.disabled = true;

    const { error } = await supabase
        .from("settings")
        .update({ is_open: isOpen })
        .eq("id", 1);

    if (error) {
        console.error("Supabase error:", error);
        button.textContent = "Error";
        button.disabled = false;
        return;
    }

    button.textContent = isOpen ? "OPEN" : "CLOSED";
    button.disabled = false;

    updatePublicStatus();
}
async function updateStatus(status) {
    const button = document.getElementById("statusButton");

    button.textContent = "Updating...";
    button.disabled = true;

    const { error } = await supabase
        .from("settings")
        .update({ status: status })
        .eq("id", 1);

    if (error) {
        console.error("Supabase error:", error);
        button.textContent = "Error";
        button.disabled = false;
        return;
    }

    button.textContent = status.toUpperCase();
    button.disabled = false;
}