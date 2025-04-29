import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {sdk} from '../../sharetribehelper/helper';
import {RootState, store, useAppSelector} from '../store';

export interface AuthInitialState {
  user: any | null;
  loading: boolean;
  tempImage: null | {
    id: string;
    name: string;
    uri: string;
    type: string;
  };
  uploadedProfileImage: null | {_sdkType: string; UUID: string};
}
export interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

const initialState: AuthInitialState = {
  user: null,
  loading: false,
  tempImage: null,
  uploadedProfileImage: null,
};

export interface ImageParams {
  file: {
    id: string;
    name: string;
    uri: string;
    type: string;
  };
}

export interface UpdateUserProfileParams {
  profileImageId: string;
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    resetAuthState: () => {
      return initialState;
    },
    setTempImage: (state, action) => {
      state.tempImage = action.payload;
    },
    mergeCurrentUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
  },
  extraReducers: builder => {
    //signup
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.rejected, state => {
        state.user = null;
        state.loading = false;
      });
    //image upload
    builder
      .addCase(uploadImage.pending, state => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadedProfileImage = action.payload;
        state.loading = false;
      })
      .addCase(uploadImage.rejected, state => {
        state.uploadedProfileImage = null;
        state.loading = false;
      });
    // current User
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.loading = false;
      });
  },
});

export const signupUser = createAsyncThunk(
  'authSlice/signup',
  async (params: SignupParams, {dispatch, getState}) => {
    try {
      const res = await sdk.currentUser.create(params, {
        expand: true,
      });
      if (res.data.data.id.uuid) {
        const loginRes = await sdk.login({
          username: params.email,
          password: params.password,
        });
        console.log('Login response:', loginRes);
      }
      const state = getState() as {auth: AuthInitialState};
      const tempImage = state.auth.tempImage;
      if (tempImage) {
        const imageParams = {
          file: {
            uri: tempImage.uri,
            name: tempImage.name,
            id: tempImage.id,
            type: tempImage.type,
          },
        };
        const resImage = await dispatch(uploadImage(imageParams)).unwrap();
        if (resImage) {
          const imageIdParams = {
            profileImageId: resImage?.id?.uuid,
          };
          const updateProfile = await dispatch(
            updateUserProfile(imageIdParams),
          );
          console.log('updateProfule', updateProfile);
        }
      }
      const currentUser = await dispatch(fetchCurrentUser());
      console.log('currentUser', currentUser);

      // res 200 ya res di user id
      // use email password
      // to login
      // return the login thunkr response
      // after login upload the image and update the user profile

      return res;
    } catch (error) {
      console.log('error for signup', JSON.stringify(error));
      throw error;
    }
  },
);

export const uploadImage = createAsyncThunk(
  'authSlice/uploadImage',
  async (imageParams: ImageParams, {}) => {
    try {
      const res = await sdk.images.upload(
        {
          image: imageParams.file,
        },
        {
          expand: true,
        },
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error for Image Upload', error);
      throw error;
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'authSlice/profileImage',
  async (params: UpdateUserProfileParams, {}) => {
    try {
      const res = await sdk.currentUser.updateProfile(params, {
        expand: true,
        include: ['profileImage'],
      });
      return res;
    } catch (error) {
      console.log('res for updateProfile', error);
      throw error;
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'authSlice/fetchCurrentUser',
  async (_, {}) => {
    try {
      const currentUserParameters = {
        include: ['profileImage'],
      };
      const res = await sdk.currentUser.show(currentUserParameters);
      if (res.status === 200) {
        return res;
      }
    } catch (error) {
      console.log('error to show', error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (params: LoginParams, {}) => {
    try {
      const result = await sdk.login(params);
      console.log('result for Logging in', result);
      const currentUser = await sdk.currentUser.show();
      return currentUser;
    } catch (error) {
      console.log('Error while Logging in', error);
    }
  },
);

export const {resetAuthState, setTempImage, mergeCurrentUser} =
  authSlice.actions;

export default authSlice.reducer;
export const user = (state: RootState) => state.auth.user;
export const displayName = (state: RootState) =>
  state?.auth?.user?.data?.data?.attributes?.profile?.displayName;
export const profileImage = (state: RootState) =>
  state?.auth?.user?.data?.included[0]?.attributes?.variants?.default?.url;
export const firstName = (state: RootState) =>
  state?.auth?.user?.data?.data?.attributes?.profile?.firstName;
export const lastName = (state: RootState) =>
  state?.auth?.user?.data?.data?.attributes?.profile?.lastName;
console.log('displayName', displayName);
