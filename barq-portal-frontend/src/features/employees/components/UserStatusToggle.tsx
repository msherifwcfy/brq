import { useState } from "react";
import { Switch } from "@/shared/components/ui/switch";
import { useUsersControllerUpdate } from "@/sdk/modules/user.gen";

interface UserStatusToggleProps {
  userId: number;
  blocked: boolean;
  onChanged?: () => void;
  disabled?: boolean;
}

export const UserStatusToggle = ({
  userId,
  blocked,
  onChanged,
  disabled,
}: UserStatusToggleProps) => {
  const [checked, setChecked] = useState(!blocked);
  const updateMutation = useUsersControllerUpdate();

  const handleChange = async (value: boolean) => {
    setChecked(value);
    try {
      await updateMutation.mutateAsync({
        path: { id: String(userId) },
        body: { blocked: !value },
      } as any);
      if (onChanged) onChanged();
    } catch (e) {
      setChecked(!value);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Switch
        checked={checked}
        onCheckedChange={handleChange}
        disabled={updateMutation.isPending || disabled}
      />
    </div>
  );
};
