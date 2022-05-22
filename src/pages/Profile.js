import EditUserForm from "../components/User/EditUserForm";
import React, {useState} from "react";
import {Button} from "@chakra-ui/react";

const Profile = () => {
    const [showEditUser, setShowEditUser] = useState(false);
    return (
        <div>
            Profile
            <Button
                borderRadius={0}
                onClick={() => setShowEditUser(true)}
                variant="solid"
                colorScheme="brand1"
                color='#565656'
                width="full">
                Editar Perfil
            </Button>
            <EditUserForm show={showEditUser} onClose={() => setShowEditUser(false)}/>
        </div>
    )
}

export default Profile
