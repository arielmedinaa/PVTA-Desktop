import React from 'react'

const SummaryProducts = ({ summaryData }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 rounded-3xl bg-gray-50 border border-gray-100 p-2">
                {summaryData.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                        <div className="flex items-center mb-2">
                            <span className={`text-${item.color}-600 mr-2 text-lg`}>
                                {item.icon}
                            </span>
                            <span className="text-gray-600">{item.label}</span>
                        </div>
                        <div className="text-3xl font-bold mb-1">{item.value}</div>
                        <div className="text-xs text-gray-500">{item.lastUpdate}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SummaryProducts