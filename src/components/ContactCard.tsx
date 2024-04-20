import { useState, useEffect } from 'react';
import axios from 'axios';

function ContactCard() {
    const [randomPerson, setPerson] = useState(null);

    useEffect(() => {
        console.log("get user!")
        axios.get('https://randomuser.me/api/').then((response) => {
            setPerson(response.data.results[0]);
        })
    }, []);

    if (!randomPerson) {
        return (
            <div className="inline-flex p-2">
                <span className="loading loading-spinner loading-xl"></span>
                <span className="text-xl ml-2">Loading...</span>
            </div>
        )
    }

    return (
        <div className="p-7">
            <p className="text-3xl text-white block pb-3">Contact Card</p>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img className="w-48 m-10 rounded-md" src={randomPerson.picture.large} alt="Album" /></figure>
                <div className="card-body p-10">
                    <h1 className="card-title text-3xl">Contact Card</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td className="text-black py-2">Title: {randomPerson.name.title}</td>
                                <td className="text-black py-2">Phone: {randomPerson.cell}</td>
                            </tr>
                            <tr>
                                <td className="text-black py-2">First Name: {randomPerson.name.first}</td>
                                <td className="text-black py-2">Email: {randomPerson.email}</td>
                            </tr>
                            <tr>
                                <td className="text-black py-2">Last Name: {randomPerson.name.last}</td>
                                <td className="text-black py-2">Age: {randomPerson.dob.age}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
        </div >
    )
}

export default ContactCard;