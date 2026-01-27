

export default function SelectedLegislators({ selectedLegs }) {
    return (
        <div className="">
            <p className="text-tfl-green text-center underline mb-2 font-bold">RECIPIENTS</p>
            <ul className="w-[90%] mx-auto flex flex-wrap justify-center gap-2 font-bold text-xs">
                {selectedLegs.map(leg => (
                    <li
                        key={leg.ID}
                    >
                        {leg.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}