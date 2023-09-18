import { getCurrentUser } from "@/lib/session";
import { ProfileSettingsForm } from "./form";

export default async function ProfileSettings() {
    const user = await getCurrentUser();

    if (!user) return null;

    return (
        <div className="p-5 flex justify-center">
            <ProfileSettingsForm user={user} />
        </div>
    );
}
