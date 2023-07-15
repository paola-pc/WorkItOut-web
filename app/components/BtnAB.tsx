'use client';

interface BtnABProps {
    action: () => void;
    condition: boolean;
    labelA: string;
    labelB: string;
    width?: string;
}

const BtnAB: React.FC<BtnABProps> = ({action, condition, width, labelA, labelB}) => {
    return ( 
         <button
            onClick={action}
            className={`
            p-2
            ${width ? `w-[${width}]` : "w-[70px]"}
            rounded-full
            hover:opacity-90
            text-neutral-100
            transition ease-out
            ${condition ? "bg-rose-500" : "bg-emerald-500"}
            ${
              condition
                ? "shadow shadow-md shadow-rose-700 translate-y-[1px]"
                : "shadow shadow-md shadow-emerald-700"
            }
            mx-2
          `}
          >
            {condition ? labelA : labelB}
          </button>
     );
}
 
export default BtnAB;
