import { useState, useEffect } from 'react';
import axios from 'axios';
import { easeInOut, motion } from 'framer-motion';

const spring = {
    type: "spring",
    damping: 30,
    stiffness: 400,
    ease: easeInOut,
}

interface Person {
    name: {
        title: string,
        first: string,
        last: string,
    },
    email: string,
    dob: {
        date: string,
        age: number,
    },
    cell: string,
    picture: {
        large: string,
    },
}

interface Response {
    data: {
        results: [
            Person,
        ],
    }
}

function ContactCard({
    isMobile
}: {
    isMobile: boolean
}) {
    const [randomPerson, setPerson] = useState<Person>();

    useEffect(() => {
        axios.get('https://randomuser.me/api/').then((response: Response) => {
            setPerson(response.data.results[0]);
        }).catch(function (error): void {
            console.log("An error occurred: " + error.toJSON());
        })
    }, []);

    if (!randomPerson) {
        return (
            <div className="p-2 w-full">
                <span className="loading loading-spinner loading-xl text-white"></span>
                <span className="text-xl text-white ml-2">Loading...</span>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            layout
            transition={spring}
            className="p-8"
        >
            <p className="text-4xl font-mono font-black text-white block mb-4">Contact Card</p>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img className="w-60 m-10 rounded-md" src={randomPerson.picture.large} alt="Album" /></figure>
                <div className="card-body p-10">
                    <h1 className="card-title text-4xl font-mono font-bold">Contact Card</h1>
                    <div className="divider text-xl">Info</div>
                    {isMobile ?
                        (<div className="overflow-x-auto">
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td className="text-black text-lg font-sans font-semibold py-1">Title: {randomPerson.name.title}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-lg font-sans font-semibold py-1">Phone: {randomPerson.cell}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-lg font-sans font-semibold py-1">First Name: {randomPerson.name.first}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-lg font-sans font-semibold py-1">Email: {randomPerson.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-lg font-sans font-semibold py-1">Last Name: {randomPerson.name.last}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-lg font-sans font-semibold py-1">Age: {randomPerson.dob.age}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>) :
                        (<div className="overflow-x-auto">
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td className="text-black text-2xl font-sans font-semibold py-2">Title: {randomPerson.name.title}</td>
                                        <td className="text-black text-2xl font-sans font-semibold py-2">Phone: {randomPerson.cell}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-2xl font-sans font-semibold py-2">First Name: {randomPerson.name.first}</td>
                                        <td className="text-black text-2xl font-sans font-semibold py-2">Email: {randomPerson.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-black text-2xl font-sans font-semibold py-2">Last Name: {randomPerson.name.last}</td>
                                        <td className="text-black text-2xl font-sans font-semibold py-2">Age: {randomPerson.dob.age}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>)
                    }
                </div>
            </div >
            {/* <div className="card lg:card-side bg-base-100 shadow-xl border-2 rounded-lg border-indigo-500 my-2 w-full block">
                <figure><img className="p-10 w-1/3 inline-flex" src={randomPerson.picture.large} alt="Picture of a random person" /></figure>
                <div className="card-body">
                    <p className="card-title text-white text-center py-3 w-1/3">Contact Card</p>
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Listen</button>
                    </div>

                </div>
            </div> */}
        </motion.div >
    )
}

export default ContactCard;