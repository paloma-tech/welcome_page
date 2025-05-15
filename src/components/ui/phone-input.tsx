"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
    return (
        <RPNInput.default
            ref={ref}
            className={cn("flex", className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not entered. To prevent this,
             * the value is coerced to an empty string.
             *
             * @param {E164Number | undefined} value - The entered value
             */
            onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
            {...props}
        />
    );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => (
        <Input className={cn("rounded-e-lg rounded-s-none bg-white", className)} {...props} ref={ref} />
    )
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const filteredCountries = React.useMemo(() => {
        if (!searchQuery.trim()) return countryList;

        return countryList.filter(({ label, value }) => {
            if (!value) return false;

            // Search by country name or country code
            const countryCode = RPNInput.getCountryCallingCode(value);
            return (
                label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                `+${countryCode}`.includes(searchQuery)
            );
        });
    }, [countryList, searchQuery]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10 bg-white"
                    disabled={disabled}
                >
                    <FlagComponent country={selectedCountry} countryName={selectedCountry} />
                    <ChevronsUpDown className={cn("-mr-2 size-4 opacity-50", disabled ? "hidden" : "opacity-100")} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-white">
                <div className="p-2 border-b">
                    <input
                        className="w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none bg-white"
                        placeholder="Search country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="h-72 overflow-auto bg-white">
                    <div className="p-1">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map(({ value, label }) =>
                                value ? (
                                    <CountrySelectOption
                                        key={value}
                                        country={value}
                                        countryName={label}
                                        selectedCountry={selectedCountry}
                                        onChange={onChange}
                                    />
                                ) : null
                            )
                        ) : (
                            <div className="py-6 text-center text-sm text-gray-500">
                                No countries found
                            </div>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange }: CountrySelectOptionProps) => {
    return (
        <button
            className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100",
                country === selectedCountry && "bg-gray-100"
            )}
            onClick={() => onChange(country)}
        >
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-sm text-gray-500">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon className={`ml-auto size-4 text-primary ${country === selectedCountry ? "opacity-100" : "opacity-0"}`} />
        </button>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-6 overflow-hidden rounded-sm border border-gray-200 [&_svg]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };
