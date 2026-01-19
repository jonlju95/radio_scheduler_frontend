import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import {useUserInfoDetail} from "../../../features/userInfo/hooks/useUserInfoDetail.ts";
import UserInfoForm from "../../../features/userInfo/components/UserInfoForm.tsx";

const UserInfoDetail = () => {
    const {userForm, loading, isNew, saveUser, updateUser} = useUserInfoDetail();

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New user" : (userForm?.firstName + " " + userForm?.lastName)}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <UserInfoForm user={userForm}
                                  onSubmit={isNew ? saveUser : updateUser}/>
                )}
            </ContentBody>
        </div>
    );
};

export default UserInfoDetail;