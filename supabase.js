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
async function changeStatus(newStatus) {

    const message = document.getElementById("message");
    const currentStatus = document.getElementById("current-status");

    message.textContent = "Updating...";

    const { data, error } = await supabaseClient
        .from("settings")
        .update({ status: newStatus })
        .eq("id", 1)
        .select();

    if (error) {
        console.error(error);
        message.textContent = "❌ " + error.message;
        return;
    }

    currentStatus.textContent = data[0].status;
    message.textContent = "✅ Updated!";
}