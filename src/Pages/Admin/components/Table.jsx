import React from 'react';

export default function Table({ item }) {
    return (
        <table className='w-[100%]'>
            <tbody>
                <tr className='px-8'>
                    {
                        item.map((data, index) => {
                            return (
                                <td key={index}>
                                    {data}
                                </td>
                            );
                        })
                    }
                </tr>
            </tbody>
        </table>
    );
}
