import { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "lib/cn";

export type Icons = keyof typeof icons;

const iconVariants = cva("relative z-10", {
  variants: {
    size: {
      "14": "size-3.5",
      "16": "size-4",
      "18": "size-4.5",
      "20": "size-5",
      "22": "size-5.5",
      "24": "size-6",
      "64": "size-16",
      "72": "size-18",
      navigation: "size-7 xs:size-8",
      "theme-toggle": "size-5.5 xs:size-4.5",
      full: "size-full",
    },
  },
  defaultVariants: {
    size: "18",
  },
});

const icons = {
  code: (
    <path
      d="M10.25 9L7.95711 11.2929C7.56658 11.6834 7.56658 12.3166 7.95711 12.7071L10.25 15M13.75 9L16.0429 11.2929C16.4334 11.6834 16.4334 12.3166 16.0429 12.7071L13.75 15M5.75 20.25H18.25C19.3546 20.25 20.25 19.3546 20.25 18.25V5.75C20.25 4.64543 19.3546 3.75 18.25 3.75H5.75C4.64543 3.75 3.75 4.64543 3.75 5.75V18.25C3.75 19.3546 4.64543 20.25 5.75 20.25Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  craft: (
    <path
      d="M21.25 17.7497C21.25 17.7497 20.0611 19.5441 18.166 19.5441C16.271 19.5441 15.4594 18.1147 13.9866 18.1147C12.5138 18.1147 11.4964 18.9145 10.5 19.9997M18.1642 4.16391L18.8358 4.83548C19.6168 5.61653 19.6168 6.88286 18.8358 7.66391L6.58579 19.9139C6.21071 20.289 5.70201 20.4997 5.17157 20.4997H2.5V17.8281C2.5 17.2977 2.71071 16.789 3.08579 16.4139L15.3358 4.16391C16.1168 3.38286 17.3832 3.38286 18.1642 4.16391Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  home: (
    <path d="M4.59202 20.282L4.81901 19.8365L4.81901 19.8365L4.59202 20.282ZM3.71799 19.408L4.16349 19.181L4.16349 19.181L3.71799 19.408ZM20.282 19.408L19.8365 19.181L19.8365 19.181L20.282 19.408ZM19.408 20.282L19.181 19.8365L19.181 19.8365L19.408 20.282ZM20.282 4.59202L19.8365 4.81901L19.8365 4.81901L20.282 4.59202ZM19.408 3.71799L19.181 4.16349L19.181 4.16349L19.408 3.71799ZM3.71799 4.59202L3.27248 4.36502L3.27248 4.36502L3.71799 4.59202ZM4.59202 3.71799L4.36502 3.27248L4.36502 3.27248L4.59202 3.71799ZM12.5 3.5V3H11.5V3.5H12.5ZM3.5 9H3V10H3.5V9ZM11.5 20.5V21H12.5V20.5H11.5ZM20.5 15H21V14H20.5V15ZM20 6.7V17.3H21V6.7H20ZM17.3 20H6.7V21H17.3V20ZM4 17.3V6.7H3V17.3H4ZM6.7 4H17.3V3H6.7V4ZM6.7 20C6.1317 20 5.73554 19.9996 5.42712 19.9744C5.12454 19.9497 4.95069 19.9036 4.81901 19.8365L4.36502 20.7275C4.66117 20.8784 4.98126 20.9413 5.34569 20.9711C5.70428 21.0004 6.1482 21 6.7 21V20ZM3 17.3C3 17.8518 2.99961 18.2957 3.02891 18.6543C3.05868 19.0187 3.12159 19.3388 3.27248 19.635L4.16349 19.181C4.0964 19.0493 4.05031 18.8755 4.02559 18.5729C4.00039 18.2645 4 17.8683 4 17.3H3ZM4.81901 19.8365C4.53677 19.6927 4.3073 19.4632 4.16349 19.181L3.27248 19.635C3.51217 20.1054 3.89462 20.4878 4.36502 20.7275L4.81901 19.8365ZM20 17.3C20 17.8683 19.9996 18.2645 19.9744 18.5729C19.9497 18.8755 19.9036 19.0493 19.8365 19.181L20.7275 19.635C20.8784 19.3388 20.9413 19.0187 20.9711 18.6543C21.0004 18.2957 21 17.8518 21 17.3H20ZM17.3 21C17.8518 21 18.2957 21.0004 18.6543 20.9711C19.0187 20.9413 19.3388 20.8784 19.635 20.7275L19.181 19.8365C19.0493 19.9036 18.8755 19.9497 18.5729 19.9744C18.2645 19.9996 17.8683 20 17.3 20V21ZM19.8365 19.181C19.6927 19.4632 19.4632 19.6927 19.181 19.8365L19.635 20.7275C20.1054 20.4878 20.4878 20.1054 20.7275 19.635L19.8365 19.181ZM21 6.7C21 6.1482 21.0004 5.70428 20.9711 5.34569C20.9413 4.98126 20.8784 4.66117 20.7275 4.36502L19.8365 4.81901C19.9036 4.95069 19.9497 5.12454 19.9744 5.42712C19.9996 5.73554 20 6.1317 20 6.7H21ZM17.3 4C17.8683 4 18.2645 4.00039 18.5729 4.02559C18.8755 4.05031 19.0493 4.0964 19.181 4.16349L19.635 3.27248C19.3388 3.12159 19.0187 3.05868 18.6543 3.02891C18.2957 2.99961 17.8518 3 17.3 3V4ZM20.7275 4.36502C20.4878 3.89462 20.1054 3.51217 19.635 3.27248L19.181 4.16349C19.4632 4.3073 19.6927 4.53677 19.8365 4.81901L20.7275 4.36502ZM4 6.7C4 6.1317 4.00039 5.73554 4.02559 5.42712C4.05031 5.12454 4.0964 4.95069 4.16349 4.81901L3.27248 4.36502C3.12159 4.66117 3.05868 4.98126 3.02891 5.34569C2.99961 5.70428 3 6.1482 3 6.7H4ZM6.7 3C6.1482 3 5.70428 2.99961 5.34569 3.02891C4.98126 3.05868 4.66117 3.12159 4.36502 3.27248L4.81901 4.16349C4.95069 4.0964 5.12454 4.05031 5.42712 4.02559C5.73554 4.00039 6.1317 4 6.7 4V3ZM4.16349 4.81901C4.3073 4.53677 4.53677 4.3073 4.81901 4.16349L4.36502 3.27248C3.89462 3.51217 3.51217 3.89462 3.27248 4.36502L4.16349 4.81901ZM11.5 3.5V9.5H12.5V3.5H11.5ZM12 9H3.5V10H12V9ZM11.5 9.5V14.5H12.5V9.5H11.5ZM11.5 14.5V20.5H12.5V14.5H11.5ZM12 15H20.5V14H12V15Z" />
  ),
  toolbox: (
    <path
      d="M12.5 10.5V6.5M19.5 10.5V4.5C19.5 3.39543 18.6046 2.5 17.5 2.5H14.5C13.3954 2.5 12.5 3.39543 12.5 4.5V6.5M4.5 10.5V6.39547C4.5 6.03384 4.59805 5.67897 4.78372 5.36864L6.24329 2.92907C6.40252 2.66293 6.68986 2.5 7 2.5V2.5C7.31014 2.5 7.59748 2.66293 7.75671 2.92907L9.21628 5.36864C9.40195 5.67897 9.5 6.03384 9.5 6.39547V10.5M12.5 6.5H15.5M2.5 10.5H21.5V18.5C21.5 19.6046 20.6046 20.5 19.5 20.5H4.5C3.39543 20.5 2.5 19.6046 2.5 18.5V10.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  music: (
    <path
      d="M9.75 18.7503C9.75 20.131 8.40685 21.2503 6.75 21.2503C5.09315 21.2503 3.75 20.131 3.75 18.7503C3.75 17.3696 5.09315 16.2503 6.75 16.2503C8.40685 16.2503 9.75 17.3696 9.75 18.7503ZM9.75 18.7503V7.25899C9.75 6.36599 10.342 5.58119 11.2007 5.33591L17.7029 3.47853C18.9805 3.11357 20.2522 4.0729 20.2522 5.40161V15.7503M20.2522 15.7503C20.2522 17.131 18.9091 18.2503 17.2522 18.2503C15.5953 18.2503 14.2522 17.131 14.2522 15.7503C14.2522 14.3696 15.5953 13.2503 17.2522 13.2503C18.9091 13.2503 20.2522 14.3696 20.2522 15.7503Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  ),
  copy: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 4.25C22 3.00736 20.9926 2 19.75 2H10.25C9.00736 2 8 3.00736 8 4.25V8H4.25C3.00736 8 2 9.00736 2 10.25V19.75C2 20.9926 3.00736 22 4.25 22H13.75C14.9926 22 16 20.9926 16 19.75V16H19.75C20.9926 16 22 14.9926 22 13.75V4.25ZM16 14H19.75C19.8881 14 20 13.8881 20 13.75V4.25C20 4.11193 19.8881 4 19.75 4H10.25C10.1119 4 10 4.11193 10 4.25V8H13.75C14.9926 8 16 9.00736 16 10.25V14Z"
      fill="currentColor"
    />
  ),
  check: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.5905 3.193C22.0362 3.51911 22.1332 4.1448 21.8071 4.59053L10.1012 20.5905C9.94056 20.8101 9.69734 20.9548 9.42768 20.9911C9.15802 21.0274 8.8852 20.9523 8.67214 20.7831L2.37802 15.7831C1.94558 15.4395 1.8735 14.8105 2.21703 14.3781C2.56056 13.9456 3.18961 13.8735 3.62205 14.2171L9.10146 18.5699L20.193 3.40961C20.5191 2.96388 21.1448 2.8669 21.5905 3.193Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  player: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm5.1-2c.497 0 .907.405.833.897a6 6 0 0 1-3.246 4.468c-.444.222-.957-.042-1.11-.515-.154-.473.112-.973.541-1.223a4.199 4.199 0 0 0 1.986-2.734c.106-.486.499-.893.996-.893Zm-11.033-.897c-.074.492.336.897.833.897.497 0 .89-.408.996-.893a4.2 4.2 0 0 1 1.986-2.734c.429-.25.695-.75.541-1.223-.153-.473-.666-.737-1.11-.515a6 6 0 0 0-3.246 4.468Z"
      fill="currentColor"
    />
  ),
  mail: (
    <path
      d="M3.84202 19.032L4.18251 18.3638L4.18251 18.3638L3.84202 19.032ZM2.96799 18.158L3.63624 17.8175L3.63624 17.8175L2.96799 18.158ZM21.032 18.158L20.3638 17.8175L20.3638 17.8175L21.032 18.158ZM20.158 19.032L20.4985 19.7003L20.4985 19.7003L20.158 19.032ZM21.032 5.84202L20.3638 6.18251L20.3638 6.18251L21.032 5.84202ZM20.158 4.96799L20.4985 4.29973L20.4985 4.29973L20.158 4.96799ZM2.96799 5.84202L2.29973 5.50153L2.29973 5.50153L2.96799 5.84202ZM3.84202 4.96799L3.50153 4.29973L3.50153 4.29973L3.84202 4.96799ZM10.7335 11.9638L10.2586 12.5443L10.2586 12.5443L10.7335 11.9638ZM13.2665 11.9638L13.7414 12.5443L13.2665 11.9638ZM20.5 7.95V16.05H22V7.95H20.5ZM18.05 18.5H5.95V20H18.05V18.5ZM3.5 16.05V7.95H2V16.05H3.5ZM5.95 5.5H18.05V4H5.95V5.5ZM5.95 18.5C5.37757 18.5 4.99336 18.4994 4.69748 18.4752C4.41035 18.4518 4.27307 18.4099 4.18251 18.3638L3.50153 19.7003C3.83879 19.8721 4.19545 19.9392 4.57533 19.9703C4.94646 20.0006 5.40232 20 5.95 20V18.5ZM2 16.05C2 16.5977 1.99942 17.0535 2.02974 17.4247C2.06078 17.8046 2.12789 18.1612 2.29973 18.4985L3.63624 17.8175C3.5901 17.7269 3.54822 17.5896 3.52476 17.3025C3.50058 17.0066 3.5 16.6224 3.5 16.05H2ZM4.18251 18.3638C3.94731 18.2439 3.75608 18.0527 3.63624 17.8175L2.29973 18.4985C2.56338 19.0159 2.98408 19.4366 3.50153 19.7003L4.18251 18.3638ZM20.5 16.05C20.5 16.6224 20.4994 17.0066 20.4752 17.3025C20.4518 17.5896 20.4099 17.7269 20.3638 17.8175L21.7003 18.4985C21.8721 18.1612 21.9392 17.8046 21.9703 17.4247C22.0006 17.0535 22 16.5977 22 16.05H20.5ZM18.05 20C18.5977 20 19.0535 20.0006 19.4247 19.9703C19.8046 19.9392 20.1612 19.8721 20.4985 19.7003L19.8175 18.3638C19.7269 18.4099 19.5896 18.4518 19.3025 18.4752C19.0066 18.4994 18.6224 18.5 18.05 18.5V20ZM20.3638 17.8175C20.2439 18.0527 20.0527 18.2439 19.8175 18.3638L20.4985 19.7003C21.0159 19.4366 21.4366 19.0159 21.7003 18.4985L20.3638 17.8175ZM22 7.95C22 7.40232 22.0006 6.94646 21.9703 6.57533C21.9392 6.19545 21.8721 5.83879 21.7003 5.50153L20.3638 6.18251C20.4099 6.27307 20.4518 6.41035 20.4752 6.69748C20.4994 6.99336 20.5 7.37757 20.5 7.95H22ZM18.05 5.5C18.6224 5.5 19.0066 5.50058 19.3025 5.52476C19.5896 5.54822 19.7269 5.5901 19.8175 5.63624L20.4985 4.29973C20.1612 4.12789 19.8046 4.06078 19.4247 4.02974C19.0535 3.99942 18.5977 4 18.05 4V5.5ZM21.7003 5.50153C21.4366 4.98408 21.0159 4.56338 20.4985 4.29973L19.8175 5.63624C20.0527 5.75608 20.2439 5.94731 20.3638 6.18251L21.7003 5.50153ZM3.5 7.95C3.5 7.37757 3.50058 6.99336 3.52476 6.69748C3.54822 6.41035 3.5901 6.27307 3.63624 6.18251L2.29973 5.50153C2.12789 5.83879 2.06078 6.19545 2.02974 6.57533C1.99942 6.94646 2 7.40232 2 7.95H3.5ZM5.95 4C5.40232 4 4.94646 3.99942 4.57533 4.02974C4.19545 4.06078 3.83879 4.12789 3.50153 4.29973L4.18251 5.63624C4.27307 5.5901 4.41035 5.54822 4.69748 5.52476C4.99336 5.50058 5.37757 5.5 5.95 5.5V4ZM3.63624 6.18251C3.75608 5.94731 3.94731 5.75608 4.18251 5.63624L3.50153 4.29973C2.98408 4.56338 2.56338 4.98408 2.29973 5.50153L3.63624 6.18251ZM11.2085 11.3833L3.47493 5.0559L2.52507 6.21684L10.2586 12.5443L11.2085 11.3833ZM20.5251 5.0559L12.7915 11.3833L13.7414 12.5443L21.4749 6.21684L20.5251 5.0559ZM10.2586 12.5443C11.2716 13.3731 12.7284 13.3731 13.7414 12.5443L12.7915 11.3833C12.3311 11.7601 11.6689 11.7601 11.2085 11.3833L10.2586 12.5443Z"
      fill="currentColor"
    />
  ),
  "arrow-left": (
    <path
      d="M10 18L4 12M4 12L10 6M4 12H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-right": (
    <path
      d="M14 6L20 12M20 12L14 18M20 12H4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  snooze: (
    <path
      d="M14.6668 4.45496C15.1875 4.639 15.7588 4.36608 15.9428 3.84536C16.1269 3.32465 15.854 2.75332 15.3332 2.56928L14.6668 4.45496ZM21.7522 9.77871C21.63 9.24012 21.0943 8.90258 20.5557 9.02479C20.0171 9.147 19.6796 9.68269 19.8018 10.2213L21.7522 9.77871ZM19 1C18.4477 1 18 1.44772 18 2C18 2.55228 18.4477 3 19 3V1ZM22 2L22.8 2.6C23.0273 2.29698 23.0638 1.89157 22.8944 1.55279C22.725 1.214 22.3788 1 22 1V2ZM19 6L18.2 5.4C17.9727 5.70302 17.9362 6.10843 18.1056 6.44721C18.275 6.786 18.6212 7 19 7V6ZM22 7C22.5523 7 23 6.55228 23 6C23 5.44772 22.5523 5 22 5V7ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8H13ZM12 12H11C11 12.2652 11.1054 12.5196 11.2929 12.7071L12 12ZM13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13.7929 15.2071ZM20 12C20 16.4183 16.4183 20 12 20V22C17.5228 22 22 17.5228 22 12H20ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 4C12.9368 4 13.834 4.16061 14.6668 4.45496L15.3332 2.56928C14.2894 2.20032 13.167 2 12 2V4ZM19.8018 10.2213C19.9314 10.7924 20 11.3876 20 12H22C22 11.2377 21.9145 10.494 21.7522 9.77871L19.8018 10.2213ZM19 3H22V1H19V3ZM21.2 1.4L18.2 5.4L19.8 6.6L22.8 2.6L21.2 1.4ZM19 7H22V5H19V7ZM11 8V12H13V8H11ZM11.2929 12.7071L13.7929 15.2071L15.2071 13.7929L12.7071 11.2929L11.2929 12.7071Z"
      fill="currentColor"
    />
  ),
};

export default memo(function Icon({
  name,
  size,
  className,
}: {
  name: keyof typeof icons;
  size?: VariantProps<typeof iconVariants>["size"];
  className?: string;
}) {
  return (
    <div className={cn(iconVariants({ size, className }))}>
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        {icons[name]}
      </svg>
    </div>
  );
});
