import Swal from "sweetalert2";

interface ConfirmDangerOptions {
  title?: string;
  text?: string;
  confirmText?: string;
}

export async function confirmDanger({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmText = "Yes, delete it",
}: ConfirmDangerOptions = {}) {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: confirmText,
  });

  return result.isConfirmed;
}
