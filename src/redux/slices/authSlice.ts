import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {sdk} from '../../sharetribehelper/helper';
import {store} from '../store';

export interface AuthInitialState {
  user: string | null;
  loading: boolean;
  tempImage: null | {
    id: string;
    name: string;
    uri: string;
    type: string;
  };
  uploadedProfileImage: null | {_sdkType: string; UUID: string};
}

const initialState: AuthInitialState = {
  user: null,
  loading: false,
  tempImage: null,
  uploadedProfileImage: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    resetAuthState: () => {
      return initialState;
    },
    setTempImage: (state, action) => {
      state.tempImage = action.payload;
      console.log('redux temp >>>>>', action.payload);
    },
    mergeCurrentUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
      console.log('state.user', JSON.stringify(state.user));
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
        // console.log('state.user>>>>>>', state.user);
        state.loading = false;
      })
      .addCase(signupUser.rejected, state => {
        state.user = null;
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
  async (params, {dispatch, getState}) => {
    try {
      console.log('params for Signup', params);

      console.log('sdk-->>>>>>', sdk);
      const res = await sdk.currentUser.create(params, {
        expand: true,
      });
      console.log('res for Signup-->>>', JSON.stringify(res));
      console.log('first', res.data.data.id.uuid);
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
        console.log('resImage-->>', resImage);
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

      return currentUser;
    } catch (error) {
      console.log('error for signup', JSON.stringify(error));
      throw error;
    }
  },
);

export const uploadImage = createAsyncThunk(
  'authSlice/uploadImage',
  async (imageParams, {}) => {
    try {
      console.log('param for image', imageParams);
      const res = await sdk.images.upload(
        {
          image: imageParams.file,
        },
        {
          expand: true,
        },
      );
      console.log('res for img', res);
      return res?.data?.data;
    } catch (error) {
      console.log('error for Image Upload', error);
      throw error;
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'authSlice/profileImage',
  async (params, {}) => {
    try {
      console.log('params for Imageupload', params);
      const res = await sdk.currentUser.updateProfile(params, {
        expand: true,
        include: ['profileImage'],
      });
      console.log('res for updateProfile', res);
      return res;
    } catch (error) {
      console.log('res for updateProfile', error);
      throw error;
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'authSlice/fetchCurrentUser',
  async (param = {}, {dispatch}) => {
    try {
      const currentUserParameters = {
        include: ['profileImage'],
      };
      const params = {...param, ...currentUserParameters};
      const res = await sdk.currentUser.show(currentUserParameters);
      console.log('res for current user', res);
      //return res;
      if (res.status === 200) {
        const res2 = dispatch(mergeCurrentUser(res));
        return res2;
      }
    } catch (error) {
      console.log('error to show', error);
    }
  },
);
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (params, {}) => {},
// );

export const {resetAuthState, setTempImage, mergeCurrentUser} =
  authSlice.actions;

export default authSlice.reducer;
function getState(): {auth: AuthInitialState} {
  throw new Error('Function not implemented.');
}
