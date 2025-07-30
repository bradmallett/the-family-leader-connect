

export default function SelectState({ state, setState }) {
const usStates = [
  'ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT',
  'DELAWARE', 'FLORIDA', 'GEORGIA', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA',
  'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN',
  'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE',
  'NEW JERSEY', 'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'OHIO',
  'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE ISLAND', 'SOUTH CAROLINA', 'SOUTH DAKOTA',
  'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA',
  'WISCONSIN', 'WYOMING'
];

    return (
        <div className="relative flex">
            <button
                ref={triggerRef}
                className="p-1 outline-none cursor-pointer border-2 flex group hover:border-tfl-green"
                onClick={() => setShowStates(true)}
            >
            <span className="font-medium group-hover:text-tfl-green">{state || 'SELECT STATE'}</span>
            <ChevronDownIcon className="h-5 text-gray-600 cursor-pointer group-hover:text-tfl-green" />
            </button>

            {showStates && (
            <div
                className="absolute top-8 p-1 flex flex-col border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 max-h-[200px] overflow-y-auto custom-scroll"
                ref={dropdownRef}
            >
                <p className="p-2 font-black bg-slate-600">SELECT STATE</p>
                {usStates.map((stateName) => (
                <button
                    key={stateName}
                    className="p-1 hover:bg-slate-600 cursor-pointer"
                    onClick={() => {
                        setState(stateName);
                        setShowStates(false);
                    }}
                >
                    {stateName}
                </button>
                ))}
            </div>
            )}
        </div>
    );

}