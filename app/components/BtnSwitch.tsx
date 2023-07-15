'use client';

interface BtnSwitchProps {
  action: () => void;
  condition: boolean;
  label: string;
  width?: string;
  color?: string;
}

const BtnSwitch: React.FC<BtnSwitchProps>= ({ action, condition, label, width, color=""}) => {
    return ( 
        <button
            onClick={action}
            className={`
            p-2
            ${width ? `w-[${width}]` : "w-[70px]"}
            rounded-full
            hover:opacity-80
            text-neutral-900
            ${color || "bg-neutral-200"}
            translate ease-in duration-300
            ${
              condition
                ? "shadow shadow-md shadow-neutral-400"
                : "opacity-70 translate-y-[1px]"
            }
            mx-2
            `}
          >
            {label}
          </button>
     );
}
 
export default BtnSwitch;